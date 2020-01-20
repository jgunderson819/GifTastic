// set variables

let animals = [hamster, gerbel, cat]
let apikey = "usWbgNcdu9x7OUBm2UQI9JQqygo7erYf"



// Import giphy


  // Function for dumping the JSON content for each button into the div
  function displayGIFInfo() {

    var animals = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&apikey="+apikey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#animal-view").text(JSON.stringify(response));
    });
  }
// Search endpoint

var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+animals+"&api_key="+apikey+"&limit=10");
xhr.done(function(data) { console.log("success got data", data); });

 // Function for displaying animal gifs
 function renderButtons() {

    // Deleting the animal buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < animals.length; i++) {

      // Then dynamicaly generating buttons for each animal in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("animal");
      // Adding a data-attribute with a value of the animal at index i
      a.attr("data-name", animals[i]);
      // Providing the button's text with a value of the animal at index i
      a.text(animals[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-animal").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var animal = $("#animal-input").val().trim();
    // The movie from the textbox is then added to our array
    animals.push(animal);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();