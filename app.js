Vue.component('column-element', {
    props: ['element'],
    template: `
    <div
        class='column-element'
        v-html='element.content'
        v-bind:id="\`el-\${element.key}\`"
        @click='$emit("clicked", [$event.target,element.key])'
    ></div>` // Ni moverle al v-bidn:id sin entender por que se esta escapando cada parte
})

Vue.component('column', {
    props: ['things'],
    template: `
    <div class='column'>
        <column-element
            v-for='thing in things'
            v-bind:key='thing.key'
            v-bind:element='thing'
            @clicked='$emit("clicked", arguments[0])'
        ></column-element>
    </div>
    `
})

let app = new Vue({
    el: '#container',
    data: {
        //Le asignamos la misma llave a la respuesta correcta
        questions: [{ key: 1, content: 'Gato' }, { key: 5, content: 'Jirafa' }, { key: 2, content: 'Delfín' }, { key: 3, content: 'Elefante' },  { key: 6, content: 'Mono' }, { key: 4, content: 'Cerdo' }],
        answers: [{ key: 4, content: 'Pig' },{ key: 2, content: 'Dolphin' }, { key: 3, content: 'Elephant' },  { key: 6, content: 'Monkey' }, { key: 1, content: 'Cat' }, { key: 5, content: 'Giraffe' }],
        matched: [],
        firstClicked: null,
        secondClicked: null
    },
    methods: {
        clickedEvent: clickedEvent
    }
})

//Aqui guardaremos las celdas escogidas
let columnsClicked = []
function clickedEvent(e) {
    columnsClicked.push({ elem: e[0], id: e[1] })
    elem1 = columnsClicked[0]
    elem2 = columnsClicked[1]
    //Solo nos interesa colorear celdas cuando se escogieron una o dos
    if (columnsClicked.length < 3) {
        elem1.elem.style.backgroundColor = "forestgreen"
        if(columnsClicked.length === 2){
            //Si es la respuesta correcta coloreamos de verde, sino de rojo
            if(elem1.id === elem2.id){
              window.alert('Excellent! \nThat is the correct answer!');
                elem2.elem.style.backgroundColor = "forestgreen"
            }
            else{
              window.alert('Oops! \nThat is the wrong answer!');
                elem2.elem.style.backgroundColor = "red"
            }
        }
    }
    //Mantenemos en blanco todas las demas
    else {
        columnsClicked.map(column => {
            return column.elem.style.backgroundColor = "white"
        })
        columnsClicked = []
    }

}
