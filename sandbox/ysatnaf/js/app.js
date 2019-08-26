data = [data2009, data2010, data2011, data2012, data2013, data2014, data2015, data2016, data2017,data2018];

_.each(data, function (year) {
  var card = $('<div>').addClass('card');
  var header = $('<div>').addClass('card-header').append($('<h5>').addClass('mb-0').append($('<a>').attr('href','#collapse' + year.year).attr('data-toggle', 'collapse').text(year.year)));
  var table = $('<table>').addClass('table table-stripped text-center').append($('<thead>').append($('<tr>').append($('<th>').text('Place')).append($('<th>').text('Name')).append($('<th>').text('Team Name')).append($('<th>').text('Record')))).append($('<tbody>'));
  var body = $('<div>').addClass('collapse').attr('id','collapse' + year.year).attr('data-parent', '#accordion').append($('<div>').addClass('card-body').append(table));
  card.append(header).append(body);
  $('#accordion').append(card);

  _.each(year.results, function (data, order) {
    var row = $('<tr>');
    var place = $('<td>').text(order);
    var name = $('<td>').text(data.name);
    var teamName = $('<td>').text(data.team);
    var record = $('<td>').text(data.wins + ' - ' + data.losses);
    row.append(place).append(name).append(teamName).append(record);
    $('#collapse'+ year.year + ' tbody').append(row);
  });
});

total = {};

function percentage(wins, losses) {
  return Math.round(((wins / (wins + losses)) * 100 ) * 10) / 10;
}

_.each(data, function (year) {
  var champion = true;
  _.each(year.results, function (data) {
    if (total[data.name] !== undefined ) {
      total[data.name].wins += data.wins;
      total[data.name].losses += data.losses;
      total[data.name].percentage = percentage(total[data.name].wins, total[data.name].losses);
      if (champion) {
        total[data.name].championships += 1;
      }
    } else {
      var championships = 0;
      if (champion) {
        championships = 1;
      }
      total[data.name] = { 'wins': data.wins, 'losses': data.losses, 'percentage': percentage(data.wins, data.loses), 'championships': championships};
    }
    champion = false;
  });
});

array = [];
_.each(total, function(data, name) {
  array.push({'name': name, 'data': data, 'percentage': data.percentage});
});

orderedArray = _.reverse(_.sortBy(array, ['percentage']));

console.log(orderedArray);

_.each(orderedArray, function (player) {
  var row = $('<tr>');
  var name = $('<td>').text(player.name);
  var record = $('<td>').text(player.data.wins + ' - ' + player.data.losses);
  var percentage = $('<td>').text(player.percentage);
  var championships = $('<td>').text(player.data.championships);
  row.append(name).append(record).append(percentage).append(championships);

  $('#collapseTotal tbody').append(row);
});

// <tr><td>Huffman</td><td>42-27</td><td>60.9%</tr>
