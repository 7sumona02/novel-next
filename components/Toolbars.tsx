import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from 'lexical';

const Toolbars = () => {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
        }
    }, []);

    useEffect(() => {
        editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                updateToolbar();
            });
        });
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                updateToolbar();
                return false;
            },
            1
        );
    }, [editor, updateToolbar]);

    return (
        <div className='flex items-center'>
            <div className='flex gap-2'>
            <Button 
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }} 
                variant="ghost"
                className={`${isBold ? 'bg-neutral-700 hover:bg-neutral-600' : ''}`}
                size="sm">B</Button>
            <Button 
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }} 
                variant="ghost"
                className={`${isItalic ? 'bg-neutral-700 hover:bg-neutral-600' : ''}`}
                size="sm">I</Button>
            <Button 
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }} 
                variant="ghost"
                className={`${isUnderline ? 'bg-neutral-700 hover:bg-neutral-600' : ''}`}
                size="sm">U</Button>
            <Button 
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
                }} 
                variant="ghost"
                className={`${isStrikethrough ? 'bg-neutral-700 hover:bg-neutral-600' : ''}`}
                size="sm">S</Button>
            </div>
            <div className='ml-5 flex gap-2'>
            <Button 
                variant="ghost"
                size="sm">h1</Button>
            </div>
        </div>
    )
}

export default Toolbars