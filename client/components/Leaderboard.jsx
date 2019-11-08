import React from 'react';

export default ({ allHistory }) => {
  const display = allHistory.map(el => (
    <div>
      {Object.values(el).map(prop => `${prop}\t`)}
    </div>
  ));
  return (
    <div id="leaderboard">
      <h1>Leader Board</h1>
      {display}
    </div>
  );
};
