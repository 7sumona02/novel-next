import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND, $createParagraphNode } from 'lexical';
import { $createHeadingNode, $isHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';

const Toolbars = () => {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isHeading1, setIsHeading1] = useState(false);
    const [isHeading2, setIsHeading2] = useState(false);
    const [isHeading3, setIsHeading3] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
            const anchorNode = selection.anchor.getNode();
            const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElement();
            setIsHeading1($isHeadingNode(element) && element.getTag() === 'h1');
            setIsHeading2($isHeadingNode(element) && element.getTag() === 'h2');
            setIsHeading3($isHeadingNode(element) && element.getTag() === 'h3');
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
        <div className='flex items-center py-4'>
            <div className='flex gap-1'>
            <Button 
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }} 
                variant="ghost"
                className={`text-black ${isBold ? 'bg-neutral-300 hover:bg-neutral-300' : ''}`}
                size="sm">B</Button>
            <Button 
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }} 
                variant="ghost"
                className={`text-black ${isItalic ? 'bg-neutral-300 hover:bg-neutral-300' : ''}`}
                size="sm">I</Button>
            <Button 
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }} 
                variant="ghost"
                className={`text-black ${isUnderline ? 'bg-neutral-300 hover:bg-neutral-300' : ''}`}
                size="sm">U</Button>
            <Button 
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
                }} 
                variant="ghost"
                className={`text-black ${isStrikethrough ? 'bg-neutral-300 hover:bg-neutral-300' : ''}`}
                size="sm">S</Button>
            </div>
            <div className='ml-1.5 flex gap-1'>
                <Button 
                    onClick={() => {
                        editor.update(() => {
                            const selection = $getSelection();
                            if ($isRangeSelection(selection)) {
                                if (isHeading1) {
                                    $setBlocksType(selection, () => $createParagraphNode());
                                } else {
                                    $setBlocksType(selection, () => $createHeadingNode('h1'));
                                }
                            }
                        });
                    }} 
                    variant="ghost"
                    className={`text-black ${isHeading1 ? 'bg-neutral-300 hover:bg-neutral-300' : ''}`}
                    size="sm">h1</Button>
                <Button 
                    onClick={() => {
                        editor.update(() => {
                            const selection = $getSelection();
                            if ($isRangeSelection(selection)) {
                                if (isHeading2) {
                                    $setBlocksType(selection, () => $createParagraphNode());
                                } else {
                                    $setBlocksType(selection, () => $createHeadingNode('h2'));
                                }
                            }
                        });
                    }} 
                    variant="ghost"
                    className={`text-black ${isHeading2 ? 'bg-neutral-300 hover:bg-neutral-300' : ''}`}
                    size="sm">h2</Button>
                <Button 
                    onClick={() => {
                        editor.update(() => {
                            const selection = $getSelection();
                            if ($isRangeSelection(selection)) {
                                if (isHeading3) {
                                    $setBlocksType(selection, () => $createParagraphNode());
                                } else {
                                    $setBlocksType(selection, () => $createHeadingNode('h3'));
                                }
                            }
                        });
                    }} 
                    variant="ghost"
                    className={`text-black ${isHeading3 ? 'bg-neutral-300 hover:bg-neutral-300' : ''}`}
                    size="sm">h3</Button>
            </div>
        </div>
    )
}

export default Toolbars