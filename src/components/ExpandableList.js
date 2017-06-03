
import React,{Component} from 'react';
import {StyleSheet,ListView,Text,View,Image,TouchableHighlight,Animated} from 'react-native';


class ExpandableList extends Component{
    constructor(props){
        super(props);

        this.icons = {
            'plus'    : require('../assets/image/plus.png'),
            'cross'  : require('../assets/image/cross.png')
        };
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        delete this.props.list._figure;
        let DataSourceList = this._convertToList(this.props.list);
        let ColorRange = this._setColorRange(DataSourceList);

        this.state = {
            title       : this.props.title,
            value       : this.props.value,
            height      : DataSourceList.length,
            colorClass  : this._getClass(this.props.color),
            expanded    : true,
            ColorRange  : ColorRange,
            animation   : new Animated.Value(),
            dataSource: ds.cloneWithRows(DataSourceList)
        };

    }
    _getClass(color){
      if(color == 'GREEN'){
        return styles.green
      }else if(color == 'YELLOW'){
        return styles.yellow
      }else{
        return styles.red
      }
    }
    _setColorRange(data){
      var min = 100;
      var max = 0;
      var range = []

      for(i=0;i<data.length;i++){
        if(data[i].value !== null){

          min = min > data[i].value ? data[i].value: min;
          max = max < data[i].value ? data[i].value: max;
        }
      }
      let total_length = max-min;
      let subrange_length = total_length/3;
      var current_start = min;
      for (var i = 0; i < 3; ++i) {
        range.push([current_start,(current_start + subrange_length)])
        current_start += subrange_length;
      }
      return range
    }
    _convertToList(object){
      let list = [];
      for(var key in object){
        if(object.hasOwnProperty(key)){
          list.push({text:this._renderString(key), value:this._renderNumber(object[key]._figure[0])})
        }
      }
      return list
    }
    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }
    _renderNumber(data){
      if(data === null){
        return null
      }
      data = Number(Math.round(data+'e2')+'e-2');
      return data
    }
    _renderString(data){
      return data.substring(0,25) + ' ...'
    }
    between(x, min, max) {
      return x >= min && x <= max;
    }
    _renderColoredValue(value){
      let styleClass;
      if(value === null){
        styleClass = styles.red
        value = 0;
      }
      else if(this.between(value,this.state.ColorRange[0][0],this.state.ColorRange[0][1])){
        styleClass = styles.red
      }else if(this.between(value,this.state.ColorRange[1][0],this.state.ColorRange[1][1])){
        styleClass = styles.yellow
      }else{
        styleClass = styles.green
      }
      return (
        <Text style={[styleClass, styles.myFlex]}>{value+'%'}</Text>
      )
    }
    render(){
        let icon = this.icons['plus'];

        if(this.state.expanded){
            icon = this.icons['cross'];
        }

        return (
            <Animated.View
                style={[styles.container,{height: this.state.animation}]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <Text style={[this.state.colorClass, styles._figure]}>{this._renderNumber(this.state.value)}%</Text>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        ></Image>
                    </TouchableHighlight>
                </View>

                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                  <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <View style={styles.row}>
                                            <Text style={styles.subtitle}>
                                              {data.text}
                                            </Text>
                                            {this._renderColoredValue(data.value)}
                                          </View>}

                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  />
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden',
        borderRadius: 5,
    },
    titleContainer : {
        flexDirection: 'row',
        shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 0.4
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding:10,
      alignItems: 'flex-start'
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E'
    },
    subtitle:{
      flex:4,
      fontSize: 15,
      fontWeight:'normal'
    },
    subtitlevalue:{
      fontSize: 15,
      fontWeight:'bold',
      marginLeft: 10
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#000',
        fontWeight:'normal',
        marginTop: 0,
        marginLeft: 10,
        fontSize:20
    },
    _figure:{
      marginTop:10
    },
    myFlex:{
      flex:1,
      marginLeft:10
    },
    red:{

      color:'#F84A00',
      fontSize:15,
      marginRight:15
    },
    green:{

      color:'#00F057',
      fontSize:15,
      marginRight:15
    },
    yellow:{

      color:'#F2E800',
      fontSize:15,
      marginRight:15
    }
    ,
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25,
        marginTop: 10,
        marginRight: 10
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});

export default ExpandableList;
