import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React, { useState } from 'react'
import { Button } from './ui/button';
import { FORMAT_TEXT_COMMAND } from 'lexical';

const Toolbars = () => {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    return (
        <div className='flex gap-2'>
            <Button 
                onClick={() => {
                    setIsBold(!isBold);
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }} 
                variant="ghost"
                className={`${isBold ? 'bg-neutral-700 hover:bg-neutral-600' : ''}`}
                size="sm">B</Button>
            <Button 
                onClick={() => {
                    setIsItalic(!isItalic);
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }} 
                variant="ghost"
                className={`${isItalic ? 'bg-neutral-700 hover:bg-neutral-600' : ''}`}
                size="sm">I</Button>
            <Button 
                onClick={() => {
                    setIsUnderline(!isUnderline);
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }} 
                variant="ghost"
                className={`${isUnderline ? 'bg-neutral-700 hover:bg-neutral-600' : ''}`}
                size="sm">U</Button>
            <Button 
                onClick={() => {
                    setIsStrikethrough(!isStrikethrough);
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
                }} 
                variant="ghost"
                className={`${isStrikethrough ? 'bg-neutral-700 hover:bg-neutral-600' : ''}`}
                size="sm">S</Button>
        </div>
    )
}

export default Toolbars