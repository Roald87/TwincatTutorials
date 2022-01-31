// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var RowClassesProvider = function (rowData, rowIndex, rowNumber) {
        var cssStyles = []; // Collected CSS styles which will be returned at the end

        if (!rowData.Test1) { // If the first column (Test1) is empty
            cssStyles.push('missing-input'); // add the missing-input style to the array
        }

        if (rowData.Test2 < 0) { // If the value of the second column is negative
            cssStyles.push('below-zero'); // add the below-zero style
        }

        if (!rowData.Test3) { // If the checkbox in the third column is not checked
            cssStyles.push('not-checked');
        }

        if (rowData.Test4 == "cookncode") { // if the text in the fourth column is cookncode
            cssStyles.push('bold');
        }

        return cssStyles;
    };
    
    TcHmi.Functions.registerFunction('RowClassesProvider', RowClassesProvider);
})(TcHmi);