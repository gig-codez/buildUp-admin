import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Box, Typography, Divider, Avatar, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const formatLabel = (key) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) {
    if (!value.length) return '—';
    return value
      .map((v) => {
        if (v && typeof v === 'object') {
          if (v.name && v.value !== undefined) return `${v.name}: ${v.value}`;
          if (v.first_name || v.last_name) return `${v.first_name || ''} ${v.last_name || ''}`.trim();
          if (v.name) return v.name;
          return JSON.stringify(v);
        }
        return String(v);
      })
      .join(', ');
  }
  if (typeof value === 'object') {
    if (value.first_name || value.last_name) return `${value.first_name || ''} ${value.last_name || ''}`.trim();
    if (value.business_name) return value.business_name;
    if (value.name) return value.name;
    return JSON.stringify(value);
  }
  return String(value);
};

/**
 * Generic read-only viewer for a DataGrid row, opened on row click.
 * `fields`: [{ key, label?, fullWidth?, format?(value, row) }]
 */
const RecordDetailDialog = ({ open, onClose, title, subtitle, row, fields, imageField }) => {
  if (!row) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography variant="h6">{title || 'Details'}</Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <IconButton onClick={onClose} aria-label="Close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        {imageField && row[imageField] && (
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar src={row[imageField]} variant="rounded" sx={{ width: 96, height: 96 }} />
          </Box>
        )}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          {fields.map(({ key, label, fullWidth, format }) => (
            <Box key={key} sx={fullWidth ? { gridColumn: '1 / -1' } : undefined}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                {label || formatLabel(key)}
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                {format ? format(row[key], row) : formatValue(row[key])}
              </Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordDetailDialog;
