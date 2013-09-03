var Batch = {
  createBatch: function(){
    $('#new_batch').submit(function(event) {
      event.preventDefault()

      type = $('#type').val()
      time = parseInt($('#time').val())

      var batch = {type: type, requiredBakeTime: time}

      console.log(batch)

      Table.addBatches(batch)

      console.log(Table)

      //we want to get the params of the form
      // and create a cookie object using those params
    })
  }
}

var Table = {

  init: function() {
    this.pendingBatches = new Array()
  },

  addBatches: function(batch){
    this.pendingBatches.push(batch)
    // $('#prep_batches').append
  }
}

//when we create a batch we append a li of the batch type to table
//when appended to table, table needs an add to oven button
//when add to oven clicked, which adds the cookie to the oven

$(document).ready(function() {
  Batch.createBatch()
  Table.init()
})
