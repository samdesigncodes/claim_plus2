module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D26A',
        secondary: '#A1A1AA',
        buttonDisabled: '#D4D4D8',
        inputFocus: '#00D26A',
        inputBorder: '#E5E7EB',
        error: '#EF4444',
        stripe: '#6366F1',
        textPrimary: '#000000',
        textSecondary: '#6B7280',
      },
      borderRadius: {
        'md': '8px',
      },
    },
  },
  plugins: [],
}; 