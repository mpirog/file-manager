export const getUserName = () => {  
  let userName = null;

  const args = process.argv.slice(2).forEach((value) => {
    const val = value.split('=');

    if (val[0] === '--username') {
      userName = val[1];
    }
  });

  if (!userName && typeof userName !== 'number') {
    throw new Error('Invalid input: User name was not defined');
  }

  return userName;
};
