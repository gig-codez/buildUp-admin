import React, { useState } from "react";
import {
  Box, Typography, Tabs, Tab, Card, CardContent, CardActions,
  Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, Tooltip, CircularProgress,
  useTheme, Badge, ToggleButtonGroup, ToggleButton,
} from "@mui/material";
import {
  ForwardToInbox as ForwardIcon,
  Block as RejectIcon,
  Refresh as RefreshIcon,
  Image as ImageIcon,
  AttachFile as FileIcon,
  Videocam as VideoIcon,
  Mic as AudioIcon,
  Chat as ChatIcon,
  Handshake as EscrowIcon,
} from "@mui/icons-material";
import {
  useGetAdminMessagesQuery,
  useForwardMessageMutation,
  useRejectMessageMutation,
  useGetAdminEscrowMessagesQuery,
  useForwardEscrowMessageMutation,
  useRejectEscrowMessageMutation,
} from "state/api";

// ── Helpers ────────────────────────────────────────────────────────────────

function formatTime(time) {
  if (!time) return "";
  const d = new Date(time);
  return d.toLocaleString();
}

function roleLabel(id = "") {
  const prefix = id.substring(0, 3);
  const map = { cli: "Client", con: "Contractor", sup: "Supplier", con2: "Consultant" };
  const userId = id.substring(3);
  const role = map[prefix] ?? prefix;
  return `${role} (${userId.substring(0, 8)}…)`;
}

function personName(person) {
  if (!person) return "—";
  return `${person.first_name || ""} ${person.last_name || ""}`.trim() || "—";
}

function MediaTypeIcon({ type }) {
  if (type === "image") return <ImageIcon fontSize="small" />;
  if (type === "video") return <VideoIcon fontSize="small" />;
  if (type === "audio") return <AudioIcon fontSize="small" />;
  if (type === "file" || type === "document") return <FileIcon fontSize="small" />;
  return null;
}

function statusColor(status) {
  if (status === "pending") return "warning";
  if (status === "forwarded") return "success";
  if (status === "rejected") return "error";
  return "default";
}

function AttachmentLink({ url, label, theme }) {
  return (
    <Typography variant="body2">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        style={{
          color:
            theme.palette.mode === "dark"
              ? theme.palette.primary.light
              : theme.palette.primary.main,
        }}
      >
        {label}
      </a>
    </Typography>
  );
}

// ── Platform Message Card ────────────────────────────────────────────────────

function MessageCard({ msg, onForward, onReject }) {
  const theme = useTheme();
  const isMedia = msg.message_type !== "text";

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderLeft: `4px solid ${
          msg.status === "pending"
            ? theme.palette.warning.main
            : msg.status === "forwarded"
            ? theme.palette.success.main
            : theme.palette.error.main
        }`,
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        {/* Header row */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
            <Chip label={`From: ${roleLabel(msg.sender_id)}`} size="small" color="primary" variant="outlined" />
            <Typography variant="body2" color="text.secondary">→</Typography>
            <Chip label={`To: ${roleLabel(msg.receiver_id)}`} size="small" color="secondary" variant="outlined" />
          </Box>
          <Chip label={msg.status} size="small" color={statusColor(msg.status)} />
        </Box>

        {/* Message content */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: 1,
            backgroundColor: theme.palette.background.default,
            mb: 1,
          }}
        >
          {isMedia ? (
            <Box display="flex" alignItems="center" gap={1}>
              <MediaTypeIcon type={msg.message_type} />
              {msg.media_url ? (
                msg.message_type === "image" ? (
                  <img
                    src={msg.media_url}
                    alt="media"
                    style={{ maxHeight: 180, maxWidth: "100%", borderRadius: 4, display: "block" }}
                  />
                ) : (
                  <AttachmentLink url={msg.media_url} label={`View ${msg.message_type}`} theme={theme} />
                )
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {msg.message}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography variant="body1">{msg.message}</Typography>
          )}
        </Box>

        {/* Meta */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <Typography variant="caption" color="text.secondary">
            Sent: {formatTime(msg.time)}
          </Typography>
          {msg.forwarded_at && (
            <Typography variant="caption" color="success.main">
              Forwarded: {formatTime(msg.forwarded_at)}
            </Typography>
          )}
          {msg.admin_note && (
            <Typography variant="caption" color="text.secondary">
              Note: <em>{msg.admin_note}</em>
            </Typography>
          )}
        </Box>
      </CardContent>

      {msg.status === "pending" && (
        <CardActions sx={{ px: 2, pb: 1.5, pt: 0 }}>
          <Button
            size="small"
            variant="contained"
            color="success"
            startIcon={<ForwardIcon />}
            onClick={() => onForward(msg)}
          >
            Forward
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<RejectIcon />}
            onClick={() => onReject(msg)}
            sx={{ ml: 1 }}
          >
            Reject
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

// ── Escrow Chat Message Card ──────────────────────────────────────────────────
// Same moderation flow as MessageCard, adapted to taskChat's field names
// (sender_name is already human-readable, attachment_url/attachment_type
// instead of media_url/message_type, and escrow_id carries job context).

function EscrowMessageCard({ msg, onForward, onReject }) {
  const theme = useTheme();
  const escrow = msg.escrow_id || {};
  const hasAttachment = !!msg.attachment_url;

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderLeft: `4px solid ${
          msg.status === "pending"
            ? theme.palette.warning.main
            : msg.status === "forwarded"
            ? theme.palette.success.main
            : theme.palette.error.main
        }`,
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        {/* Header row */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1} flexWrap="wrap" gap={1}>
          <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
            <Chip
              label={`${msg.sender_role === "employer" ? "Employer" : "Contractor"}: ${msg.sender_name}`}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary">on</Typography>
            <Chip label={escrow.title || "Escrow"} size="small" variant="outlined" />
          </Box>
          <Chip label={msg.status} size="small" color={statusColor(msg.status)} />
        </Box>

        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
          {personName(escrow.employer_id)} ↔ {personName(escrow.contractor_id)}
        </Typography>

        {/* Message content */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: 1,
            backgroundColor: theme.palette.background.default,
            mb: 1,
          }}
        >
          {hasAttachment ? (
            <Box display="flex" alignItems="center" gap={1}>
              <MediaTypeIcon type={msg.attachment_type} />
              {msg.attachment_type === "image" ? (
                <img
                  src={msg.attachment_url}
                  alt="attachment"
                  style={{ maxHeight: 180, maxWidth: "100%", borderRadius: 4, display: "block" }}
                />
              ) : (
                <AttachmentLink url={msg.attachment_url} label={`View ${msg.attachment_type || "attachment"}`} theme={theme} />
              )}
            </Box>
          ) : (
            <Typography variant="body1">{msg.message}</Typography>
          )}
        </Box>

        {/* Meta */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <Typography variant="caption" color="text.secondary">
            Sent: {formatTime(msg.createdAt)}
          </Typography>
          {msg.forwarded_at && (
            <Typography variant="caption" color="success.main">
              Forwarded: {formatTime(msg.forwarded_at)}
            </Typography>
          )}
          {msg.admin_note && (
            <Typography variant="caption" color="text.secondary">
              Note: <em>{msg.admin_note}</em>
            </Typography>
          )}
        </Box>
      </CardContent>

      {msg.status === "pending" && (
        <CardActions sx={{ px: 2, pb: 1.5, pt: 0 }}>
          <Button
            size="small"
            variant="contained"
            color="success"
            startIcon={<ForwardIcon />}
            onClick={() => onForward(msg)}
          >
            Forward
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<RejectIcon />}
            onClick={() => onReject(msg)}
            sx={{ ml: 1 }}
          >
            Reject
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

// ── Main Scene ─────────────────────────────────────────────────────────────

const TABS = ["pending", "forwarded", "rejected", ""];
const TAB_LABELS = ["Pending", "Forwarded", "Rejected", "All"];

export default function Messages() {
  const theme = useTheme();
  const [source, setSource] = useState("platform"); // "platform" | "escrow"
  const [tabIndex, setTabIndex] = useState(0);
  const [noteDialog, setNoteDialog] = useState(null); // { msg, action }
  const [noteText, setNoteText] = useState("");

  const currentStatus = TABS[tabIndex];
  const isEscrow = source === "escrow";

  const platformQuery = useGetAdminMessagesQuery(
    { status: currentStatus, limit: 100 },
    { pollingInterval: 15000, skip: isEscrow } // auto-refresh every 15 s
  );
  const escrowQuery = useGetAdminEscrowMessagesQuery(
    { status: currentStatus, limit: 100 },
    { pollingInterval: 15000, skip: !isEscrow }
  );
  const { data, isLoading, isFetching, refetch } = isEscrow ? escrowQuery : platformQuery;

  const [forwardMessage, { isLoading: forwardingPlatform }] = useForwardMessageMutation();
  const [rejectMessage, { isLoading: rejectingPlatform }] = useRejectMessageMutation();
  const [forwardEscrowMessage, { isLoading: forwardingEscrow }] = useForwardEscrowMessageMutation();
  const [rejectEscrowMessage, { isLoading: rejectingEscrow }] = useRejectEscrowMessageMutation();
  const forwarding = isEscrow ? forwardingEscrow : forwardingPlatform;
  const rejecting = isEscrow ? rejectingEscrow : rejectingPlatform;

  const messages = data?.data ?? [];
  const pendingCount = messages.filter((m) => m.status === "pending").length;

  function openDialog(msg, action) {
    setNoteDialog({ msg, action });
    setNoteText("");
  }

  function closeDialog() {
    setNoteDialog(null);
    setNoteText("");
  }

  async function confirmAction() {
    if (!noteDialog) return;
    const { msg, action } = noteDialog;
    const forwardFn = isEscrow ? forwardEscrowMessage : forwardMessage;
    const rejectFn = isEscrow ? rejectEscrowMessage : rejectMessage;
    if (action === "forward") {
      await forwardFn({ id: msg._id, admin_note: noteText });
    } else {
      await rejectFn({ id: msg._id, admin_note: noteText });
    }
    closeDialog();
  }

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <ChatIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Message Inbox
          </Typography>
          {pendingCount > 0 && tabIndex === 0 && (
            <Chip label={`${pendingCount} pending`} color="warning" size="small" sx={{ ml: 1 }} />
          )}
        </Box>
        <Tooltip title="Refresh">
          <IconButton onClick={refetch} disabled={isFetching} aria-label="Refresh messages">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="body2" color="text.secondary" mb={2}>
        {isEscrow
          ? "All escrow chat messages between employers and contractors are held here first. Review and forward approved messages, or reject them."
          : "All platform messages are held here first. Review and forward approved messages to the recipient, or reject them."}
      </Typography>

      {/* Source toggle */}
      <ToggleButtonGroup
        value={source}
        exclusive
        onChange={(_, v) => v && setSource(v)}
        size="small"
        sx={{ mb: 2 }}
      >
        <ToggleButton value="platform">
          <ChatIcon fontSize="small" sx={{ mr: 1 }} /> Platform Messages
        </ToggleButton>
        <ToggleButton value="escrow">
          <EscrowIcon fontSize="small" sx={{ mr: 1 }} /> Escrow Chat
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(_, v) => setTabIndex(v)}
        sx={{ mb: 3, borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        {TAB_LABELS.map((label, i) => (
          <Tab
            key={label}
            label={
              i === 0 ? (
                <Badge badgeContent={data?.total ?? 0} color="warning" max={99}>
                  {label}
                </Badge>
              ) : label
            }
          />
        ))}
      </Tabs>

      {/* Messages list */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : messages.length === 0 ? (
        <Box textAlign="center" mt={8}>
          <ChatIcon sx={{ fontSize: 56, color: theme.palette.text.disabled }} />
          <Typography variant="h6" color="text.secondary" mt={1}>
            No {currentStatus || ""} {isEscrow ? "escrow messages" : "messages"}
          </Typography>
        </Box>
      ) : (
        <Box>
          {messages.map((msg) =>
            isEscrow ? (
              <EscrowMessageCard
                key={msg._id}
                msg={msg}
                onForward={(m) => openDialog(m, "forward")}
                onReject={(m) => openDialog(m, "reject")}
              />
            ) : (
              <MessageCard
                key={msg._id}
                msg={msg}
                onForward={(m) => openDialog(m, "forward")}
                onReject={(m) => openDialog(m, "reject")}
              />
            )
          )}
        </Box>
      )}

      {/* Confirm dialog */}
      <Dialog open={!!noteDialog} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {noteDialog?.action === "forward" ? "Forward Message" : "Reject Message"}
        </DialogTitle>
        <DialogContent>
          {noteDialog && (
            <Box mb={2} p={1.5} sx={{ backgroundColor: theme.palette.background.default, borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {isEscrow
                  ? `${noteDialog.msg.sender_name} (${noteDialog.msg.sender_role}) on ${noteDialog.msg.escrow_id?.title || "escrow"}`
                  : `${roleLabel(noteDialog.msg.sender_id)} → ${roleLabel(noteDialog.msg.receiver_id)}`}
              </Typography>
              <Typography variant="body1">
                {noteDialog.msg.message || (isEscrow ? "(attachment)" : "")}
              </Typography>
            </Box>
          )}
          <TextField
            label="Admin note (optional)"
            fullWidth
            multiline
            rows={2}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={
              noteDialog?.action === "forward"
                ? "Add a note visible to the recipient…"
                : "Reason for rejection (shown to sender)…"
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button
            variant="contained"
            color={noteDialog?.action === "forward" ? "success" : "error"}
            onClick={confirmAction}
            disabled={forwarding || rejecting}
          >
            {noteDialog?.action === "forward" ? "Forward" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
