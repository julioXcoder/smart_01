function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " Bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
  else return (bytes / 1073741824).toFixed(2) + " GB";
}

function getUserInitials(fullName: string): string {
  // Split the full name into an array of words
  const words = fullName.split(" ");

  // Initialize an empty string to hold the initials
  let initials = "";

  // Loop through each word in the array
  for (const word of words) {
    // Append the first character of each word to the initials string
    initials += word.charAt(0).toUpperCase();
  }

  // Return the initials
  return initials;
}

export { formatBytes, getUserInitials };
