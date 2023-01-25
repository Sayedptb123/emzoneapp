// import React, { useState } from 'react';
// import { Image, TouchableOpacity } from "react-native";
// import DateTimePicker from '@react-native-community/datetimepicker';



// const CustomCalender = ({ ...props }) => {
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     props.from = currentDate
//     setDate(currentDate);
//   };
//   const showDatepicker = () => {
//     showMode('date');
//   };
//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };
//   return (<>
//     <TouchableOpacity onPress={showDatepicker}>
//       <Image
//         size={6, 6}
//         mx="2"
//         source={require('../assets/icons/calendar.png')}
//         alt="image"
//       />
//     </TouchableOpacity>
//     {show && (
//       <DateTimePicker
//         testID="dateTimePicker"
//         value={date}
//         mode={mode}
//         is24Hour={true}
//         display="default"
//         onChange={props.onChangeCustom}
//       />
//     )}
//   </>)
// }

// export default CustomCalender;
