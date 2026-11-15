// =====================================================================
// PROJECTEN
// Voeg hier je projecten toe. Zolang deze lijst leeg is, blijft het
// onderdeel "Projecten" op de pagina en in het menu verborgen.
//
// Voorbeeld van één project (haal de // weg en vul in):
//
// {
//   titel: 'Naam van het project',
//   omschrijving: 'Wat het project deed en wat het opleverde.',
//   rol: 'Jouw rol in het project',
//   technieken: ['Python', 'TypeScript'],
//   link: 'https://...'            // mag je weglaten
// },
// =====================================================================
const projecten = [
];

// ---------------------------------------------------------------------
// Thema wisselen (licht beige en donker)
// ---------------------------------------------------------------------
(function () {
  const root = document.documentElement;
  const knop = document.querySelector('.thema-knop');
  const tekst = knop.querySelector('.thema-tekst');
  const systeemDonker = window.matchMedia('(prefers-color-scheme: dark)');

  function huidigThema() {
    const gekozen = root.getAttribute('data-theme');
    if (gekozen === 'dark' || gekozen === 'light') return gekozen;
    return systeemDonker.matches ? 'dark' : 'light';
  }

  function werkKnopBij() {
    const donker = huidigThema() === 'dark';
    knop.setAttribute('aria-pressed', String(donker));
    tekst.textContent = donker ? 'Licht thema' : 'Donker thema';
  }

  knop.addEventListener('click', function () {
    const nieuw = huidigThema() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nieuw);
    try { localStorage.setItem('thema', nieuw === 'dark' ? 'donker' : 'licht'); } catch (e) {}
    werkKnopBij();
  });

  systeemDonker.addEventListener('change', werkKnopBij);
  werkKnopBij();
})();

// ---------------------------------------------------------------------
// Projecten tonen
// ---------------------------------------------------------------------
(function () {
  if (!projecten.length) return;

  const sectie = document.getElementById('projecten');
  const lijst = sectie.querySelector('.projecten-lijst');

  projecten.forEach(function (p) {
    const artikel = document.createElement('article');
    artikel.className = 'project';

    const kop = document.createElement('h3');
    kop.textContent = p.titel || '';
    artikel.appendChild(kop);

    if (p.rol) {
      const rol = document.createElement('p');
      rol.className = 'regel-meta';
      rol.textContent = p.rol;
      artikel.appendChild(rol);
    }

    if (p.omschrijving) {
      const tekst = document.createElement('p');
      tekst.textContent = p.omschrijving;
      artikel.appendChild(tekst);
    }

    if (p.technieken && p.technieken.length) {
      const tags = document.createElement('ul');
      tags.className = 'tags';
      p.technieken.forEach(function (t) {
        const li = document.createElement('li');
        li.textContent = t;
        tags.appendChild(li);
      });
      artikel.appendChild(tags);
    }

    if (p.link) {
      const a = document.createElement('a');
      a.href = p.link;
      a.rel = 'noopener';
      a.textContent = 'Bekijk het project';
      artikel.appendChild(a);
    }

    lijst.appendChild(artikel);
  });

  sectie.hidden = false;
  document.querySelector('.menu-projecten').hidden = false;
})();
