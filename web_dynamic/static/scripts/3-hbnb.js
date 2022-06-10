
$(function () {
  const AmenitiesChecked = {};
  $(document).on('change', "input[type='checkbox']", function () {
    debugger
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
  $.ajax({url: "http://0.0.0.0:5001/api/v1/places_search/",
          method: "POST",
          data: JSON.stringify({}),
          contentType : 'application/json',
    success: function(response){
      for (const place of response){
        let user = getUser(place.user_id);
        let article = `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${ place.price_by_night }</div>
          </div>
          <div class="information">
            <div class="max_guest">${ place.max_guest } Guest</div>
              <div class="number_rooms">${ place.number_rooms } Bedroom </div>
              <div class="number_bathrooms">${ place.number_bathrooms } Bathroom </div>
          </div>
          <div class="user">
              <b>Owner:</b> ${user}
          </div>
          <div class="description">
              ${place.description}
          </div>
        </article>`
        $(".places").append(article);
      }

    }

  });

  function getUser(user){
      // debugger
      let firstName = '';
      let lastName = '';
      $.ajax({url: "http://0.0.0.0:5001/api/v1/users/" + user,
      contentType : 'application/json',
      success: function(data){
        firstName = data.first_name;
        console.log(firstName)
        lastName = data.last_name;
      }
    });
    return [firstName, lastName];

  }
});