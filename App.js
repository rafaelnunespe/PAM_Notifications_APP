import React from 'react';
import { StyleSheet, View, Button, StatusBar, Text } from 'react-native';
import { Notifications, Permissions, Constants } from 'expo';
import moment from 'moment';

export default class App extends React.Component {
  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
      alert('Notification permissions granted.');
    }

    Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    alert(`Notification (${origin}) with data: ${JSON.stringify(data)}`);
  };

  _sendDelayedNotification() {
    const localNotification = {
      title: 'Deixar ele voar?',
      body: 'Está certo mesmo, mais vale um pássaro na mão do que dois voando!',
      data: { type: 'immediate' },
    };

    console.log('Scheduling immediate notification:', { localNotification });

    Notifications.presentLocalNotificationAsync(localNotification)
      .then((id) => console.info(`Immediate notification scheduled (${id})`))
      .catch((err) => console.error(err));
  }

  _sendImmediateNotification() {
    const localNotification = {
      title: '...',
      body: 'Você se esticou para pegar o outro passáro...',
      data: { type: 'immediate' },
    };

    console.log('Scheduling immediate notification:', { localNotification });

    Notifications.presentLocalNotificationAsync(localNotification)
      .then((id) => console.info(`Immediate notification scheduled (${id})`))
      .catch((err) => console.error(err));

    const localNotification1 = {
      title: '...',
      body: 'Ele abriu as asas e voou um pouco para cima',
      data: { type: 'delayed' },
    };

    const schedulingOptions1 = {
      time: new Date().getTime() + 1000,
    };
    console.log('Scheduling delayed notification:', {
      localNotification1,
      schedulingOptions1,
    });
    Notifications.scheduleLocalNotificationAsync(
      localNotification1,
      schedulingOptions1
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled (${id}) at ${moment(
            schedulingOptions1.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));

    const localNotification2 = {
      title: '...',
      body: 'Você levantou e tentou pegar ele mais acima',
      data: { type: 'delayed' },
    };

    const schedulingOptions2 = {
      time: new Date().getTime() + 8000,
    };
    console.log('Scheduling delayed notification:', {
      localNotification2,
      schedulingOptions2,
    });
    Notifications.scheduleLocalNotificationAsync(
      localNotification2,
      schedulingOptions2
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled (${id}) at ${moment(
            schedulingOptions2.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));

    const localNotification3 = {
      title: '.....',
      body: 'Ele escapou, voou e você perdeu o equilibrio',
      data: { type: 'delayed' },
    };

    const schedulingOptions3 = {
      time: new Date().getTime() + 10000,
    };
    console.log('Scheduling delayed notification:', {
      localNotification3,
      schedulingOptions3,
    });
    Notifications.scheduleLocalNotificationAsync(
      localNotification3,
      schedulingOptions3
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled (${id}) at ${moment(
            schedulingOptions3.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));

    const localNotification4 = {
      title: 'Sem equilibrio',
      body: 'Para se equilibrar você abriu a outra mão e o passáro que você tinha voou também!',
      data: { type: 'delayed' },
    };

    const schedulingOptions4 = {
      time: new Date().getTime() + 13000,
    };
    console.log('Scheduling delayed notification:', {
      localNotification4,
      schedulingOptions4,
    });
    Notifications.scheduleLocalNotificationAsync(
      localNotification4,
      schedulingOptions4
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled (${id}) at ${moment(
            schedulingOptions4.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <Text style={styles.txt}>Você possui 1 passáro,{'\n'}está em suas mãos{'\n'}Você avista por perto{'\n'} um outro pássaro...</Text>
        <Button
          title="Vou tentar pegar..."
          onPress={() => this._sendImmediateNotification()}
          color="#3CB371"
        />
        <Text>{'\n'}</Text>
        <Button
          title="Vou deixar ele voar..."
          onPress={() => this._sendDelayedNotification()}
          color="#3CB371"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontWeight: 'bold',
    height: 170,
    fontSize: 20,
    color: 'white',
  },
});
