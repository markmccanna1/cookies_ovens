
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
      batchId = $(this).data('id')
      batch = Table.findBatch(batchId)
      Table.moveBatch(batch)
    });

  },

  addBatches: function(batch){
    this.pendingBatches.push(batch)
    $('#prep_batches').append('<li>' + batch.type + '<form data-id="' + batch.id + '" class="batch"> <input type="submit" value="Add to oven"> </form></li>')
  },

  findBatch: function(id){
    item = this.pendingBatches.filter(function(element){ return element.id === id
  })
    return item[0]
  },

  moveBatch: function(batch){
    batch = this.findBatch(batch.id)
    Oven.racks.push(batch)
    var index = this.pendingBatches.indexOf(batch)
    this.pendingBatches.splice(index, 1)
  }
}

var Oven = {

  init: function() {
    this.racks = new Array()
  },
}


$(document).ready(function() {
  Table.init()
  Batch.init()
  Oven.init()
})
