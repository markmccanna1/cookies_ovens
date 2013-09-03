var Batch = {

  init: function(){
    this.listenForCreateEvent()
  },

  createBatch: function(type, time){
    var batch = {type: type, requiredBakeTime: time, timeBaked: 0}
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
  },

  addBatches: function(batch){
    this.pendingBatches.push(batch)
    $('#prep_batches').append('<li>' + batch.type + '<input class="batch" type="submit" value="Add to oven"> </li>')
  }
}

var Oven = {

  init: function() {
    this.trays
  }

}
//when we create a batch we append a li of the batch type to table
//when appended to table, table needs an add to oven button
//when add to oven clicked, which adds the cookie to the oven

$(document).ready(function() {
  Table.init()
  Batch.init()
  Oven.init()
})
