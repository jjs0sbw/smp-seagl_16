/* global Backbone, $, _, N1, n1 */
(function () {
  'use strict'

  // View class for displaying structure input items
  N1.Views.StructuresClusterCreationView = Backbone.View.extend({
    el: '#n1-app',
    template: _.template($('#structure-cluster-tmpl').html()),
    initialize: function () {
      var dataCluster = Number.parseInt(this.$('#matrix-size-cluster').val())
      n1.size = N1.MathLib.GridTools.validateData(dataCluster)
      N1.MathLib.GridTools.initHandler(n1.size)
    },

    render: function () {
      console.log('2 - n1.size is: ' + n1.size)
      var html = this.template()
      this.$el.html(html)
      $('#display').css('heigth', (Number((n1.size * 20) + Number(40))))
      $('#display').css('width', (Number((n1.size * 20) + Number(40))))
      $('#canvas-main').prop('width', Number(n1.size * 20))
      $('#canvas-main').prop('height', Number(n1.size * 20))
      $('#canvas-left-side').prop('width', Number(20))
      $('#canvas-left-side').prop('height', Number(n1.size * 20))
      $('#canvas-bottom').prop('width', Number(n1.size * 20))
      $('#canvas-bottom').prop('height', Number(20))
      $('#canvas-vector').prop('width', Number(n1.vectorGridLength * 20))
      $('#canvas-vector').prop('height', Number(n1.vectorGrid.elements.length * 20))
      $('#canvas-vector').hide()
      var canvas = $('#canvas-main').get(0)
      var context = canvas.getContext('2d')
      var canvas2 = $('#canvas-left-side').get(0)
      var context2 = canvas2.getContext('2d')
      var canvas1 = $('#canvas-bottom').get(0)
      var context1 = canvas1.getContext('2d')
      console.log('3 - n1.size is: ' + n1.size)
      N1.MathLib.GridTools.initClusterGrid(
        canvas, context, canvas1, context1, canvas2, context2, n1.size)

      return this
    },

    events: {
      'click .enter-data': 'enterData',
    },

    enterData: function () {
      n1.columnNumber = Number.parseInt($('#column-number').val())
      if (isNaN(n1.columnNumber)) {
        this.$('#column-number').val(' ')
        alert('Please enter a number from 1 to ' + n1.size + ' in the column number box. The number in the column box and row box can not be the same.')
      }
      n1.rowNumber = Number.parseInt($('#row-number').val())
      if (isNaN(n1.rowNumber)) {
        this.$('#row-number').val(' ')
        alert('Please enter a number from 1 to ' + n1.size + ' in the row number box. The number in the column box and row box can not be the same.')
      }
      var canvas = $('#canvas-main').get(0)
      var context = canvas.getContext('2d')
      var canvas1 = $('#canvas-bottom').get(0)
      var context1 = canvas1.getContext('2d')
      var canvas2 = $('#canvas-left-side').get(0)
      var context2 = canvas2.getContext('2d')
      var canvas3 = $('#canvas-vector').get(0)
      var context3 = canvas3.getContext('2d')
      var cellSize = 20
      var rcOne = n1.columnNumber
      var rcTwo = n1.rowNumber
      N1.MathLib.GridTools.same(rcOne, rcTwo, canvas, context, canvas1,
          context1, canvas2, context2, canvas3, context3, cellSize)

      n1.size = n1.gridColor.elements.length // do not remove
      $('#display').css('heigth', (Number((n1.size * 20) + Number(40))))
      $('#display').css('width', (Number((n1.size * 20) + Number(40))))
      $('#canvas-main').prop('width', Number(n1.size * 20))
      $('#canvas-main').prop('height', Number(n1.size * 20))
      $('#canvas-left-side').prop('height', Number(n1.size * 20))
      $('#canvas-bottom').prop('width', Number(n1.size * 20))
      $('#canvas-vector').prop('width', Number(n1.vectorGridLength * 20))
      $('#canvas-vector').prop('heigth', Number(n1.vectorGrid.elements.length * 20))
      this.$('#enter-swap').show()
      this.$('#enter-infer').show()
      this.$('#canvas-vector').show()
      N1.MathLib.GridTools.reDrawCluster(canvas, context, canvas1, context1,
          canvas2, context2, canvas3, context3, cellSize)
    }

  })
}())
