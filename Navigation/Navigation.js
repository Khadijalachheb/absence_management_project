// Navigation/Navigation.js

import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Start from '../Components/start';
import ClassDetail from '../Components/ClassDetail';
import StudentDetail from '../Components/StudentDetail';
const StartStackNavigator = createStackNavigator({
  Start: {
    screen: Start,
    navigationOptions: {
      title: "Gestion d'absence"
    }
  },
  ClassDetail:{
      screen: ClassDetail,
      navigationOptions: {
        title: "Students"
      }
  },
  StudentDetail:{
    screen: StudentDetail,
    navigationOptions: {
      title: "L'absence"
    }
  }
})


export default createAppContainer(StartStackNavigator);
