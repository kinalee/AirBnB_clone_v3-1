$(document).ready(function () {
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
