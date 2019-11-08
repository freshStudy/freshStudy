import React from 'react';

export default ({ allHistory }) => {
  const display = allHistory.map(el => (
    <span>
      {Object.values(el).map(data => <p>{data}</p>)}
    </span>
  ));
  return (
    <div id="leaderboard">
      {display}
    </div>
  );
};
