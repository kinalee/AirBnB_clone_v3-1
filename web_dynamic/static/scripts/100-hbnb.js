$(document).ready(function () {
  // Listens for changes on each amenity input checkbox tag
  let amenityObj = {}; // Object to save checked amenity elements

  $('div.amenities input[type="checkbox"]').change(function () {
    if (this.checked) {
      amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete amenityObj[$(this).attr('data-name')];
    }

    if (Object.keys(amenityObj).length < 1) {
      $('div.amenities h4').text('\u00A0'); // fill in the h4 tag with blank
      // optional
      // $('div.amenities h4').html('&nbsp;');
    } else {
      $('div.amenities h4').text(Object.keys(amenityObj).join(', '));
      // optional
      // $('div.amenities h4').text($.map(amenityObj, function (name) { return name; }).join(', '));
    }
  });

  // --------------------------------------------------------------------

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

  // --------------------------------------------------------------------

  // generates place articles
  function placeGenerator (obj) {
    if (obj === undefined) {
      obj = '{}';
    }
    console.log(obj);
    $('section.places').empty();
    $('section.places').append($('<h1>').text('Places'));
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
    });
  }
  placeGenerator();

  // --------------------------------------------------------------------

  // Filters places when search button is clicked
  $('section.filters button').click(function () {
    let obj = {};

    if (Object.keys(amenityObj).length > 0) {
      console.log(amenityObj);
      obj["amenities"] = Object.values(amenityObj);
    }
    if (stateArray.length > 0) {
      obj["states"] = stateArray;
    }
    if (cityArray.length > 0) {
      obj["cities"] = cityArray;
    }
    placeGenerator(JSON.stringify(obj));
  });

  // --------------------------------------------------------------------

  // Listens for changes on each state and city input checkbox tag
  let locationObj = {};
  let stateArray = [];
  let cityArray = [];

  $('div.locations input[type="checkbox"]').change(function () {
    if (this.checked) {
      locationObj[$(this).attr('data-name')] = $(this).attr('data-id');
      if ($(this).attr('class') === 'state') {
        stateArray.push($(this).attr('data-id'));
      } else {
        cityArray.push($(this).attr('data-id'));
      }
    } else {
      delete locationObj[$(this).attr('data-name')];
      if ($(this).attr('class') === 'state') {
        stateArray.pop($(this).attr('data-id'));
      } else {
        cityArray.pop($(this).attr('data-id'));
      }
    }
    if(Object.keys(locationObj).length < 1) {
      $('div.locations h4').text('\u00A0');
    } else {
      $('div.locations h4').text(Object.keys(locationObj).join(', '));
    }
  });
});
