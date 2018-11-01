
function setDateInput(date) {
  document.getElementById('date-input').value = moment(date).format('YYYY-MM-DD');
}

ReactDOM.render(React.createElement(
  'button',
  {
    type: 'button',
    className: 'button',
    onClick: function onClick() {
      return setDateInput(new Date());
    }
  },
  'Today'
), document.getElementById('date-picker'));
