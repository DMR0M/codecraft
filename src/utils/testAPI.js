fetch('https://emkc.org/api/v2/piston/runtimes')
  .then(response => response.json())
  .then(data => {
    // 'data' is an array of language objects
    data.forEach(language => {
      console.log(`Language: ${language.language}`);
      console.log(`Version: ${language.version}`);
      console.log(`Aliases: ${language.aliases.join(', ')}`);
      console.log('---');
    });
  })
  .catch(error => {
    console.error('Error fetching language data:', error);
  });
