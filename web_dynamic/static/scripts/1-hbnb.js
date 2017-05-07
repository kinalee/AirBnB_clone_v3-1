$(document).ready(function () {
  // Listens for changes on each INPUT checkbox tag
  let checkedObj = {}; // Object to save checked elements

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete checkedObj[$(this).attr('data-name')];
    }

    if (Object.keys(checkedObj).length < 1) {
      $('div.amenities h4').text('\u00A0'); // fill in the h4 tag with blank
      // optional
      // $('div.amenities h4').html('&nbsp;');
    } else {
      $('div.amenities h4').text(Object.keys(checkedObj).join(', '));
      // optional
      // $('div.amenities h4').text($.map(checkedObj, function (name) { return name; }).join(', '));

      // $('div.amenities h4').addClass('overflow'); // Handles text-overflow
    }
  });
});
