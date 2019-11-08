import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Leaderboard from '../components/Leaderboard';
import LiveFeed from '../components/LiveFeed';

const mapStateToProps = ({ game }) => ({
  allHistory: game.allHistory,
});

const mapDispatchToProps = dispatch => ({
  getHistory: () => dispatch(actions.getHistory()),
});

const StatsContainer = ({
  allHistory,
  getHistory,
}) => {
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div id="stats">
      <Leaderboard allHistory={allHistory} />
      <LiveFeed />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);
