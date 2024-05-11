const genNewID = (appName, appLink) => {
    const someNumberToThisGuy = Math.floor(Math.random() * 100000);
    return `${appName}-${someNumberToThisGuy}-${appLink}`
}

export { genNewID };