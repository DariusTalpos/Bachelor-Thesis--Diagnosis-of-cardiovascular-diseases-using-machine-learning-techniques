import unittest

from validation.form_validation import form_validation
from werkzeug.datastructures import ImmutableMultiDict


class MyTestCase(unittest.TestCase):
    def test_correct_data(self):
        request = ImmutableMultiDict(
            [('age', '8925'), ('gender', '1'), ('height', '170'), ('weight', '61'), ('sys', '120'), ('dia', '80'),
             ('cholesterol', '3'), ('glucose', '3'), ('smoke', '1'), ('alcohol', '1'), ('physical', '1')])
        self.assertEqual(form_validation(request), [[8925,1,170,61,120,80,3,3,1,1,1]])

    def test_wrong_data(self):
        request = ImmutableMultiDict(
            [('age', '8925'), ('gender', 'one'), ('height', '170'), ('weight', '61'), ('sys', '120'), ('dia', '80'),
             ('cholesterol', '3'), ('glucose', '3'), ('smoke', '1'), ('alcohol', '1'), ('physical', '1')])
        self.assertEqual(form_validation(request), None)

    def test_wrong_names(self):
        request = ImmutableMultiDict(
            [('varsta', '8925'), ('gender', '1'), ('height', '170'), ('weight', '61'), ('sys', '120'), ('dia', '80'),
             ('cholesterol', '3'), ('glucose', '3'), ('smoke', '1'), ('alcohol', '1'), ('physical', '1')])
        self.assertEqual(form_validation(request), None)

    def test_missing_data(self):
        request = ImmutableMultiDict(
            [('age', '8925'), ('gender', '1'), ('height', '170'), ('weight', '61'), ('sys', '120'), ('dia', '80'),
             ('cholesterol', '3'), ('glucose', '3'), ('alcohol', '1'), ('physical', '1')])
        self.assertEqual(form_validation(request), None)


if __name__ == '__main__':
    unittest.main()
