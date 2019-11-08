import React from 'react';

export default ({ feed }) => {
  const display = feed.map(el => <p>{el}</p>);
  return (
    <div id="livefeed">
      LiveFeed
      {display}
    </div>
  )
};
