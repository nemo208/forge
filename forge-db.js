/* ============================================================
   FORGE — data layer (Firestore, with localStorage fallback)
   加载顺序：firebase-app-compat.js → firebase-firestore-compat.js
   → config.js → 本文件。
   若 config.js 未填真实 projectId，则自动回退到 localStorage
   （单浏览器模拟），保证演示随时可用。
   ============================================================ */
(function(){
  var cfg = window.FIREBASE_CONFIG || {};
  var configured = !!cfg.projectId && cfg.projectId.indexOf('PASTE_') !== 0;
  var db = null;

  if (configured && window.firebase) {
    try {
      var app = firebase.apps.length ? firebase.app() : firebase.initializeApp(cfg);
      db = firebase.firestore(app);
    } catch (e) { db = null; }
  }

  var LS_O = 'forge_orders', LS_R = 'forge_reviews';
  function loadLS(k){ try{ var a = JSON.parse(localStorage.getItem(k)||'[]'); return Array.isArray(a)?a:[]; }catch(e){ return []; } }

  window.ForgeDB = {
    enabled: !!db,
    mode: db ? 'firebase' : 'local',

    writeOrder: function(order){
      if (db) { return db.collection('orders').add(order).then(function(){ return true; }).catch(function(){ return false; }); }
      var a = loadLS(LS_O); a.unshift(order);
      try{ localStorage.setItem(LS_O, JSON.stringify(a)); }catch(e){}
      return Promise.resolve(true);
    },

    writeReview: function(review){
      if (db) { return db.collection('reviews').add(review).then(function(){ return true; }).catch(function(){ return false; }); }
      var a = loadLS(LS_R); a.unshift(review);
      try{ localStorage.setItem(LS_R, JSON.stringify(a)); }catch(e){}
      return Promise.resolve(true);
    },

    // cb(orders, reviews) — 每次数据变化都会调用（Firestore 实时 / localStorage 跨标签）
    subscribe: function(cb){
      if (db) {
        var orders = [], reviews = [];
        var u1 = db.collection('orders').orderBy('ts','desc').onSnapshot(function(snap){
          orders = snap.docs.map(function(d){ return d.data(); });
          cb(orders, reviews);
        }, function(){ cb(orders, reviews); });
        var u2 = db.collection('reviews').orderBy('ts','desc').onSnapshot(function(snap){
          reviews = snap.docs.map(function(d){ return d.data(); });
          cb(orders, reviews);
        }, function(){ cb(orders, reviews); });
        return function(){ u1(); u2(); };
      } else {
        var fire = function(){ cb(loadLS(LS_O), loadLS(LS_R)); };
        fire();
        var onStorage = function(e){ if(e.key === LS_O || e.key === LS_R) fire(); };
        window.addEventListener('storage', onStorage);
        return function(){ window.removeEventListener('storage', onStorage); };
      }
    },

    clear: function(){
      if (db) {
        var del = function(coll){
          return db.collection(coll).get().then(function(snap){
            return Promise.all(snap.docs.map(function(d){ return d.ref.delete(); }));
          });
        };
        return Promise.all([del('orders'), del('reviews')]);
      }
      localStorage.removeItem(LS_O); localStorage.removeItem(LS_R);
      return Promise.resolve();
    }
  };
})();
