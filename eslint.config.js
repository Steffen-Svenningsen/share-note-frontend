import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    {
        ignores: ['dist', 'node_modules']
    },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parserOptions: {
            ecmaFeatures: {
            jsx: true
            }
        },
        globals: {
            window: 'readonly',
            document: 'readonly',
            console: 'readonly',
            process: 'readonly',
            navigator: 'readonly',
            alert: 'readonly',
            setTimeout: 'readonly',
            clearTimeout: 'readonly',
            setInterval: 'readonly',
            clearInterval: 'readonly',
            FileReader: 'readonly',
            Node: 'readonly'
        }
        },
        plugins: {
        react,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh
        },
        rules: {
        ...js.configs.recommended.rules,
        ...react.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
        ],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-unused-vars': 'warn',
        'no-console': 'warn'
        },
        settings: {
        react: {
            version: '18.2'
        }
        }
    }
]