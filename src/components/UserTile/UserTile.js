import './UserTile.css';

const UserTile = props => (
  <div className="d-flex user-list-item">
    <div className="d-flex user-item-title">{`${props.firstName} ${props.lastName}`}</div>
    <div className="d-flex js-space-between">
      <b className="label">Current Month Reward Points</b>
      <span className="value">{props.currentMonthRewardPoints || 0}</span>
    </div>
    <div className="d-flex js-space-between">
      <b className="label">Last Month Reward Points</b>
      <span className="value">{props.previousMonthRewardPoints || 0}</span>
    </div>
    <div className="d-flex js-space-between">
      <b className="label">Other Reward Points</b>
      <span className="value">{props.otherRewardPoints || 0}</span>
    </div>
    <div className="d-flex js-space-between">
      <b className="label">Total Reward Points</b>
      <span className="value">{(props.currentMonthRewardPoints || 0) + (props.previousMonthRewardPoints || 0) + (props.otherRewardPoints || 0)}</span>
    </div>
  </div>
);

export default UserTile;
