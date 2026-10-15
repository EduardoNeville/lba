// Copy for the 404 page. `en` is the source of truth; fr/es are complete here but may
// be partial in future — the page merges with localeDict().
export const en = {
  eyebrow: 'Page not found',
  title: 'This page does not exist.',
  body: 'The address may have changed or been removed. Head back to our homepage or make a private enquiry and we will point you the right way.',
  back: 'Back to homepage',
  enquire: 'Make an enquiry',
}

export const fr: typeof en = {
  eyebrow: 'Page introuvable',
  title: 'Cette page n’existe pas.',
  body: 'L’adresse a peut-être changé ou été supprimée. Revenez à notre page d’accueil ou faites une demande privée et nous vous orienterons.',
  back: 'Retour à l’accueil',
  enquire: 'Faire une demande',
}

export const es: typeof en = {
  eyebrow: 'Página no encontrada',
  title: 'Esta página no existe.',
  body: 'Es posible que la dirección haya cambiado o se haya eliminado. Vuelva a nuestra página de inicio o realice una consulta privada y le orientaremos.',
  back: 'Volver a la página de inicio',
  enquire: 'Realizar una consulta',
}
