const Player = (name) => {
  const attackHistory = [];

  const attack = (enemyGameboard, position) => {
    return enemyGameboard.receiveAttack(position);
  };

  //Attack used by CPU player
  const randomAttack = (enemyGameboard) => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    while (attackHistory.includes(String([x, y]))) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }

    //Used to prevent computer from attacking same position more than once
    attackHistory.push(String([x, y]));

    return enemyGameboard.receiveAttack([x, y]);
  };

  const getName = () => name;

  return { getName, attack, randomAttack };
};

export default Player;
