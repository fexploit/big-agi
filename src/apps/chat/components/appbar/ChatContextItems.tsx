import * as React from 'react';
import { shallow } from 'zustand/shallow';

import { Badge, ListDivider, ListItem, ListItemDecorator, MenuItem, Switch, Typography } from '@mui/joy';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import CompressIcon from '@mui/icons-material/Compress';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import { useApplicationBarStore } from '~/common/layouts/appbar/store-applicationbar';
import { useChatStore } from '~/common/state/store-chats';
import { useUIPreferencesStore } from '~/common/state/store-ui';

import { downloadConversationJson } from '../../exportImport';


export function ChatContextItems(props: {
  conversationId: string | null, isConversationEmpty: boolean,
  isMessageSelectionMode: boolean, setIsMessageSelectionMode: (isMessageSelectionMode: boolean) => void,
  onClearConversation: (conversationId: string) => void,
  onDuplicateConversation: (conversationId: string) => void,
  onFlattenConversation: (conversationId: string) => void,
  onPublishConversation: (conversationId: string) => void
}) {

  // external state
  const { showSystemMessages, setShowSystemMessages } = useUIPreferencesStore(state => ({
    showSystemMessages: state.showSystemMessages, setShowSystemMessages: state.setShowSystemMessages,
  }), shallow);

  const closeContextMenu = () => useApplicationBarStore.getState().setContextMenuAnchor(null);

  const handleSystemMessagesToggle = () => setShowSystemMessages(!showSystemMessages);

  const handleConversationPublish = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.conversationId && props.onPublishConversation(props.conversationId);
  };

  const handleConversationDownload = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const conversation = useChatStore.getState().conversations.find(conversation => conversation.id === props.conversationId);
    if (conversation)
      downloadConversationJson(conversation);
  };

  const handleConversationDuplicate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeContextMenu();
    props.conversationId && props.onDuplicateConversation(props.conversationId);
  };

  const handleConversationFlatten = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeContextMenu();
    props.conversationId && props.onFlattenConversation(props.conversationId);
  };

  const handleToggleMessageSelectionMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeContextMenu();
    props.setIsMessageSelectionMode(!props.isMessageSelectionMode);
  };

  const handleConversationClear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.conversationId && props.onClearConversation(props.conversationId);
  };

  const disabled = !props.conversationId || props.isConversationEmpty;

  return <>

    <ListItem sticky>
      <Typography level='body2'>
        Conversation
      </Typography>
    </ListItem>

    <MenuItem onClick={handleSystemMessagesToggle}>
      <ListItemDecorator><SettingsSuggestIcon /></ListItemDecorator>
      System message
      <Switch checked={showSystemMessages} onChange={handleSystemMessagesToggle} sx={{ ml: 'auto' }} />
    </MenuItem>

    <ListDivider inset='startContent' />

    <MenuItem disabled={disabled} onClick={handleConversationDuplicate}>
      <ListItemDecorator>
        <Badge size='sm' color='info'>
          <ForkRightIcon color='info' />
        </Badge>
      </ListItemDecorator>
      Duplicate
    </MenuItem>

    <MenuItem disabled={disabled} onClick={handleConversationFlatten}>
      <ListItemDecorator>
        <Badge size='sm' color='info'>
          <CompressIcon color='info' />
        </Badge>
      </ListItemDecorator>
      Flatten
    </MenuItem>

    <ListDivider inset='startContent' />

    <MenuItem disabled={disabled} onClick={handleToggleMessageSelectionMode}>
      <ListItemDecorator>{props.isMessageSelectionMode ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}</ListItemDecorator>
      <span style={props.isMessageSelectionMode ? { fontWeight: 800 } : {}}>
        Cleanup ...
      </span>
    </MenuItem>

    <MenuItem disabled={disabled} onClick={handleConversationPublish}>
      <ListItemDecorator>
        {/*<Badge size='sm' color='primary'>*/}
        <ExitToAppIcon />
        {/*</Badge>*/}
      </ListItemDecorator>
      Share on paste.gg
    </MenuItem>

    <MenuItem disabled={disabled} onClick={handleConversationDownload}>
      <ListItemDecorator>
        <FileDownloadIcon />
      </ListItemDecorator>
      Export conversation
    </MenuItem>

    <MenuItem disabled={disabled} onClick={handleConversationClear}>
      <ListItemDecorator><ClearIcon /></ListItemDecorator>
      Reset
    </MenuItem>

  </>;
}