import '@testing-library/jest-dom';
import next from 'next';
// Next.jsをインスタンス化し、Next.js環境下でテストを行う.
// CIを回す場合は、.nextが必要になるため next buildを走らせる必要あり
next({});
