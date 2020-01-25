// set variables

let animals = ["hamster","gerbel","cat"];
let apikey = "8yn0OQ4hh9lxANpXXoyOeXxDkEmesQH3";
let state;





  // Function for dumping the JSON content for each button into the div
  $(document.body).on("click", ".animal", function() {

    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&apikey="+apikey+"&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
              }).then(function(response) {
     
     // Storing an array of results in the results variable
     var results = response.data;
      
     // Looping over every result item
     for (var i = 0; i < results.length; i++) {

       // Only taking action if the photo has an appropriate rating
       if (results[i].rating !== "r") {
         // Creating a div for the gif
         var gifDiv = $("<div>");

         // Storing the result item's rating
         var rating = results[i].rating;

         // Creating a paragraph tag with the result item's rating
         var p = $("<p>").text("Rating: " + rating);

         // Creating an image tag
         var animalImage = $("<img>");
        
         // Giving the image tag an src attribute of a proprty pulled off the
         // result item
         animalImage.attr("src", results[i].images.fixed_height.url);
         animalImage.attr("data-still", results[i].images.fixed_height_still.url)
         animalImage.attr("data-animate", results[i].images.fixed_height.url)
         animalImage.attr("data-state","still")
          animalImage.addClass("gif")
         // Appending the paragraph and personImage we created to the "gifDiv" div we created
         gifDiv.append(p);
         gifDiv.prepend(animalImage);
         
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
       
         // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
         $("#gifs-appear-here").prepend(gifDiv)
          };
        }});
      });
         
      
     
     

 

  // This function handles events where one button is clicked
  $("#add-animal").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var animalx = $("#animal-input").val().trim();
    // The movie from the textbox is then added to our array
    animals.push(animalx);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
    });
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
    a.attr("data-animal", animals[i]);
    // Providing the button's text with a value of the animal at index i
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}
$(document.body).on("click",".gif", function() {
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
 // Then, set the image's data-state to animate
 // Else set src to the data-still value
 state =  $(this).attr("data-state")
 if (state === "still") {
   $(this).attr("src", $(this).attr("data-animate"));
   $(this).attr("data-state", "animate");
 } else {
   $(this).attr("src", $(this).attr("data-still"));
   $(this).attr("data-state", "still");
 }});
  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();