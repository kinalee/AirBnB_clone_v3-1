$(document).ready(function () {

  // Listen for changes on each INPUT checkbox tag
  let checkedObj = {}; // Object to save checked elements

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete checkedObj[$(this).attr('data-name')];
    }

    if (Object.keys(checkedObj).length < 1) {
      $('div.amenities h4').text('\u00A0'); // fill in the h4 tag with blank
    } else {
      // $('div.amenities h4').addClass('overflow'); // Handles text-overflow
      $('div.amenities h4').text(Object.keys(checkedObj).join(', '));
      // $('div.amenities h4').text($.map(checkedObj, function (name) { return name; }).join(', '));
    }
  });

 //--------------------------------------------------------------------

  // status check-up
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    success: function (status) {
      if (status.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

 //--------------------------------------------------------------------

  // generates place articles
  function placeGenerator (obj) {
    if (obj === undefined) {
      obj = '{}';
    }
    $('section.places').empty();
    $('section.places').append($('<h1>').text('Places'));
    console.log(obj);
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: obj,
      success: function (data) {
        for (let p of data) {
          $('section.places').append($('<article>').append(
            $('<div class="price_by_night">').text('$' + p.price_by_night),
            $('<h2>').text(p.name),
            $('<div class="informations">').append(
              $('<div class="max_guest">').text(p.max_guest + ' Guests'),
              $('<div class="number_rooms">').text(p.number_rooms + ' Rooms'),
              $('<div class="number_bathrooms">').text(p.number_bathrooms + ' Bathrooms')),
            $('<div class="description">').text(p.description)));
        }
      }
    })
  };
  placeGenerator();

 //--------------------------------------------------------------------

  // Filters places when serch button is clicked
  $('section.filters button').click(function () {
    obj = {};
    if (checkedObj.length < 1) {
      obj = '{}'
    } else {
      obj = JSON.stringify({'amenities': Object.values(checkedObj)});
    }
    placeGenerator(obj);
  })

});
