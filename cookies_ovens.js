function Batch(type, requiredBakeTime){
  this.type = type
  this.requiredBakeTime = requiredBakeTime

}







$(document).ready(function() {

  $('#new_batch').submit(function(event) {
    event.preventDefault()
    type = $('#type').val()
    time = $('#time').val()

    var batch = new Batch(type, time)


    //we want to get the params of the form
    // and create a cookie object using those params


  })

})
