import types from '../types';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';


const fetchUserData = (id, success) => {
    return async dispatch => {
        try {
            const userData = await firestore().collection('Users').doc(id).get();
            if (userData._data != undefined) {
                dispatch({ type: types.SET_USER_INFO, payload: userData._data });
                dispatch({ type: types.SET_USER_Image, payload:userData. _data.imagePath });
                dispatch(fetchScheduleMeeting()); 
                success();
            }
        } catch (error) {
            dispatch({ type: types.ERROR, payload: error });
        }
    };
};


const fetchScheduleMeeting = () => {
    return async dispatch => {
        const userID = await AsyncStorage.getItem('@userID');
        try {
            const meetingData = await firestore().collection('ScheduleMeeting').where('userID', '==', userID).get();
            var arrData = [];
            meetingData.forEach(documentSnapshot => {
                arrData.push(documentSnapshot.data());
            });
            const todayMeeting = arrData.filter(data => moment(data.date).isSame(moment().format('YYYY-MM-DD')));
            const nextMeeting = arrData.filter(data => moment(data.date).isAfter(moment().format('YYYY-MM-DD'), 'day'));
            dispatch({ type: types.TODAY_MEETING, payload: todayMeeting });
            dispatch({ type: types.NEXT_MEETING, payload: nextMeeting });

        } catch (error) {
            dispatch({ type: types.ERROR, payload: error });
        }
    };
};

const deleteScheduleMeeting = (id, success) => {
    return async dispatch => {
        const userID = await AsyncStorage.getItem('@userID');
        try {
            const meetingData = await firestore().collection('ScheduleMeeting').where('meetingID', '==', id).where('userID', '==', userID).get();
            meetingData.forEach(function (doc) {
                doc.ref.delete();
            });
            success();
            dispatch(fetchScheduleMeeting());
        } catch (error) {
            dispatch({ type: types.ERROR, payload: error });
        }
    };
};

const resetData = () => ({
    type: types.RESET,
});

export { fetchUserData, resetData, fetchScheduleMeeting, deleteScheduleMeeting };
