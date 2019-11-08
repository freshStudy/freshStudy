import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Leaderboard from '../components/Leaderboard';
import LiveFeed from '../components/LiveFeed';

const mapStateToProps = ({ game, feed }) => ({
  allHistory: game.allHistory,
  feed: feed.history,
});

const mapDispatchToProps = dispatch => ({
  getHistory: () => dispatch(actions.getHistory()),
});

const StatsContainer = ({
  allHistory,
  feed,
  getHistory,
}) => {
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div id="stats">
      <LiveFeed feed={feed}/>
      <Leaderboard allHistory={allHistory} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);
