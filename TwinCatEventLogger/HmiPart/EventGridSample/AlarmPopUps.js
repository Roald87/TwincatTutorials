// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('onInitialized', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();

        function composeHtmlPopUpElement(event) {
            return $(
                '<div style="background:white;padding:10px;max-width:400px;">'
                + event.text + '<br><br>'
                + '<button type="button" onclick = '
                + '"var topLayer=document.getElementsByClassName(\'tchmi-in-topmostlayer\');'
                + 'var currentTop=topLayer[topLayer.length - 1];'
                + 'TcHmi.TopMostLayer.removeEx($(currentTop));"> OK'
                + '</button> '
                + '</div>');
        }

        function showPopUp(event) {
            var newPopUp = composeHtmlPopUpElement(event)
            TcHmi.TopMostLayer.addEx(newPopUp, {
                centerHorizontal: true,
                centerVertical: true,
                removecb: (data) => {
                    if (data.canceled) {
                        // user clicked on the background
                        TcHmi.TopMostLayer.removeEx(newPopUp);
                    }
                }
            });
        }

        // subscripton that is called if an event inside the list changes his state
        function subscriptionCallback(data) {
            // check if the callback object is valid
            if (data.error === TcHmi.Errors.NONE) {
                // check if the alarm type is raised
                if (data.changeType === TcHmi.Server.Events.ChangeType.AlarmRaised) {
                    showPopUp(data.event);
                }
            }
        }

        let allActiveAlarmsFilter = [
            {
                path: 'type',
                comparator: '==',
                value: TcHmi.Server.Events.Type.Alarm
            },
            {
                logic: 'AND'
            },
            {
                path: 'timeConfirmed',
                comparator: '==',
                value: new Date(null)
            }
        ];

        // register an event consumer with the Server Event API with a filter     
        // See HMI manual section 15.1.1.16.21.2 registerConsumer
        TcHmi.Server.Events.registerConsumer(
            allActiveAlarmsFilter,
            {
                subscription: subscriptionCallback
            }
        );
    });
})(TcHmi);
