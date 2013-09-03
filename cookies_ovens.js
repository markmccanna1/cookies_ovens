
var Batch = {

  init: function(){
    this.listenForCreateEvent()
    this.counter = 1
  },

  createBatch: function(type, time){
    var batch = {type: type, requiredBakeTime: time, timeBaked: 0}
    batch.id = this.counter
    this.counter += 1
    Table.addBatches(batch)
  },

  listenForCreateEvent: function(){
    $('#new_batch').submit(function(event) {
      event.preventDefault()
      type = $('#type').val()
      time = parseInt($('#time').val())
      Batch.createBatch(type, time)
    })
  }
}



var Table = {

  init: function() {
    this.pendingBatches = new Array()

    $('body').on('submit', '.batch', function(event) {
      event.preventDefault()

      // console.log(Oven.racks)
      // console.log(Table.pendingBatches)
      batch = Table.pendingBatches.shift()
      Oven.racks.push(batch)
      console.log(Oven.racks)
    });

  },

  addBatches: function(batch){
    this.pendingBatches.push(batch)
    $('#prep_batches').append('<li>' + batch.type + '<form data-id="' + batch.id + '" class="batch"> <input type="submit" value="Add to oven"> </form></li>')
  }
}

var Oven = {

  init: function() {
    this.racks = new Array()
  },


}
//when we create a batch we append a li of the batch type to table
//when appended to table, table needs an add to oven button
//when add to oven clicked, which adds the cookie to the oven

$(document).ready(function() {
  Table.init()
  Batch.init()
  Oven.init()
})
