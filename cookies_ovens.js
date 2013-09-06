
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
  },

  getState: function() {
    percentCompleted = this.timeBaked/this.requiredBakeTime;

    if (percentCompleted > 1) {
      return "crispy";
    } else if (percentCompleted > 0.8) {
      return "just_right";
    } else if (percentCompleted > 0.5) {
      return "still_gooey";
    } else {
      return "raw";
    }
  },

  bake: function(){
    this.timeBaked += 1
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
    $('#prep_batches').append('<li>' + batch.type + '<form id="' +batch.id+ '"data-id="' + batch.id + '" class="batch"> <input type="submit" value="Add to oven"> </form></li>')
  },

  findBatch: function(id){
    item = this.pendingBatches.filter(function(element){ return element.id === id
  })
    return item[0]
  },

  moveBatch: function(batch){
    batch = this.findBatch(batch.id)
    Oven.addToRack(batch)
    var index = this.pendingBatches.indexOf(batch)
    this.pendingBatches.splice(index, 1)
    //remove it from the prepping table
  }
}

var Oven = {

  init: function() {
    this.racks = new Array()

  },

  addToRack: function(batch) {
    console.log(this.racks)
    this.racks.push(batch)

    console.log(this.racks)
    //add to the dom
    var rackId = null
    for(var i = 2; i >= 0; i--){
      if ($('#rack_' + i ).text() === '[empty]')
        rackId = '#rack_' + i
    }
  console.log(rackId)
  $(rackId).text(batch.type)

  },

  bake: function(){
    this.racks.each(function(i, batch) {
      batch.bake()
    })
  }
}


$(document).ready(function() {
  Table.init()
  Batch.init()
  Oven.init()
})
