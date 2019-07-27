from subprocess import check_call

from setuptools import setup, find_packages
from setuptools.command.install import install


class InstallPluginCommand(install):
    def run(self):
        install.run(self)
        check_call(['kulado', 'plugin', 'install', 'resource', 'kubernetes', '${PLUGIN_VERSION}'])


def readme():
    with open('README.rst') as f:
        return f.read()


setup(name='kulado_kubernetes',
      version='${VERSION}',
      description='A Kulado package for creating and managing Kubernetes resources.',
      long_description=readme(),
      cmdclass={
          'install': InstallPluginCommand,
      },
      keywords='kulado kubernetes',
      url='https://kulado.io',
      project_urls={
          'Repository': 'https://github.com/kulado/kulado-kubernetes'
      },
      license='Apache-2.0',
      packages=find_packages(),
      install_requires=[
          'kulado>=0.17.18,<0.18.0',
          'requests>=2.21.0,<2.22.0',
          'pyyaml>=5.1,<5.2',
          'semver>=2.8.1',
          'parver>=0.2.1',
      ],
      zip_safe=False)
