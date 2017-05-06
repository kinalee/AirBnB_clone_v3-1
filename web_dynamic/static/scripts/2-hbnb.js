$(document).ready(function () {


  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    contentType: 'application/json',
    success: function (status) {
      if (status.status === 'ok') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    },
    error: function (status) {
      $('div#api_status').removeClass('available');
    }
  });

  let checkedList = []; // List to save checked elements

  $('input[type="checkbox"]').change(function () {

    if (this.checked) {
      checkedList.push($(this).attr('data-id'));
    } else {
      checkedList.pop($(this).attr('data-id'));
    }

    let aList = $('div.amenities h4');

    if (checkedList.length === 0) {
      aList.text('\u00A0'); // fill in the h4 tag with blank
    } else {
      $('div.amenities h4').text(checkedList.join(', '));
    }

  });

});
