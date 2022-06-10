
$(function () {
  const AmenitiesChecked = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      AmenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete AmenitiesChecked[$(this).data('id')];
    }
    const Objs = Object.values(AmenitiesChecked);
    console.log(Object.values(AmenitiesChecked));
    if (Objs) {
      $('.amenities > h4').text(Object.values(AmenitiesChecked).join(', '));
    } else {
      $('.amenities > h4').html('&nbsp;');
    }
  });
  $.ajax({url: "http://0.0.0.0:5001/api/v1/status/",
    success: function(data){
    if (data.status == 'OK'){
    $("#api_status").addClass('available');
  } else {
    $("#api_status").removeClass('available');
  }
  }});
});