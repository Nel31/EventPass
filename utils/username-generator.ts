export function generateUsernameFromName(fullName: string): string {
  if (!fullName) return ""

  // Nettoie et transforme le nom
  const cleaned = fullName
    .toLowerCase()
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9\s]/g, "") // Garde seulement lettres, chiffres et espaces
    .trim()

  // Remplace les espaces par des points
  const username = cleaned.replace(/\s+/g, ".")

  return username
}

export function generateUniqueUsername(baseUsername: string, existingUsernames: string[]): string {
  let username = baseUsername
  let counter = 1

  // Si le username de base est pris, ajoute un chiffre
  while (existingUsernames.includes(username)) {
    username = `${baseUsername}${counter}`
    counter++
  }

  return username
}

export function validateUsernameFormat(username: string): { isValid: boolean; message: string } {
  if (!username) return { isValid: false, message: "Le nom d'utilisateur est requis" }
  if (username.length < 3) return { isValid: false, message: "Au moins 3 caractères requis" }
  if (username.length > 20) return { isValid: false, message: "Maximum 20 caractères" }
  if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
    return { isValid: false, message: "Caractères autorisés : lettres, chiffres, ., -, _" }
  }
  if (username.startsWith(".") || username.endsWith(".")) {
    return { isValid: false, message: "Ne peut pas commencer ou finir par un point" }
  }

  return { isValid: true, message: "Format valide" }
}
