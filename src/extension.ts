// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "llama" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('llama.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from llama!');
	// });

	let disposable = vscode.commands.registerCommand('extension.runSelectedAsArgument', () => {
        const editor = vscode.window.activeTextEditor;
		let llama = vscode.window.createOutputChannel("llama");
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
			llama.appendLine('LLama explain this: '+text);
            const command = '/mnt/c/alpaca/chat.exe -m "C:\\alpaca\\ggml-alpaca-7b-q4.bin" -p "Explain this ' + text + '"';
            child_process.exec(command, (err, stdout, stderr) => {
                if (err) {
                    llama.appendLine(String(err));
                    return;
                }
                llama.appendLine(stdout);
				vscode.window.showInformationMessage(stdout);
            });
        }
    });

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
